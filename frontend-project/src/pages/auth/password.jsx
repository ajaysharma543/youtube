import React from 'react'
import FormContainer from '../../components/form-container';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function  Password() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
      mode: "onBlur",
    });
      const { loading, error } = useSelector((state) => state.auth); // 👈 from Redux state


    const onSubmit = async() => {
        
    }
  return (
     <FormContainer
      title="Create Account - Step 3"
      toggle={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      }
    >
          <form onSubmit={handleSubmit(onSubmit)}>
 <InputField
          label="Password"
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-8px mb-2">
            {errors.password.message}
          </p>
        )}
<InputField
  label="Confirm Password"
  type="password"
  placeholder="Confirm Password"
  {...register("confirmPassword", {
    validate: (value) =>
      value === getValues("password") || "Passwords do not match",
  })}
/>
{errors.confirmPassword && (
  <p className="text-red-500 text-sm -mt-8px mb-2">
    {errors.confirmPassword.message}
  </p>
)}

 <Button
          type="submit"
          text={loading || isSubmitting ? "Creating Account..." : "Sign Up"}
          loading={loading || isSubmitting}
          disabled={loading || isSubmitting}
        />
</form>
    </FormContainer>
    
  )
}

export default Password