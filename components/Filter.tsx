'ue client'
import { useForm } from "react-hook-form";

export default function Filter()  {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <section>   
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("job", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      
       <input type="email" {...register("email")} />
      
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}
