import Accordion from 'react-bootstrap/Accordion';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// Define the Zod schema
const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters" })
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Sign Up Here!</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="myContainer">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input {...register('firstName')} id="firstName" type="text" className="form-control" />
                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}

                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input {...register('lastName')} id="lastName" type="text" className="form-control" />
                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}

                <label htmlFor="email" className="form-label">Email</label>
                <input {...register('email')} id="email" type="email" className="form-control" />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <label htmlFor="password" className="form-label">Password</label>
                <input {...register('password')} id="password" type="password" className="form-control" />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input {...register('confirmPassword')} id="confirmPassword" type="password" className="form-control" />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                <button disabled={!isValid} className="mt-3 btn btn-primary" type="submit">Sign Up</button>
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Register;
