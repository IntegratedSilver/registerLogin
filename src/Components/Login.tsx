import Accordion from 'react-bootstrap/Accordion';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// Define the Zod schema
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Login Here!</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="myContainer">
                <label htmlFor="Email" className="form-label">Email</label>
                <input {...register('email')} id="Email" type="text" className="form-control" />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <label htmlFor="password" className="form-label">Password</label>
                <input {...register('password')} id="password" type="password" className="form-control" />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <button disabled={!isValid} className="mt-3 btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Login;
