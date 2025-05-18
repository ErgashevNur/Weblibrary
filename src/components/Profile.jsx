import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "./Navbar";
import { toast } from "./ui/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod orqali forma validatsiyasi
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function Profile() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // fetch("/api/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log("Server javobi:", result)
    //   })
    //   .catch((error) => {
    //     console.error("Xatolik:", error)
    //   })
  }

  return (
    <>
      <Navbar />
      <section
        className="flex items-start justify-center gap-[99px] bg-[length:700px_700px] bg-[position:900px_0px] bg-no-repeat p-6 pl-20 pt-8"
        style={{ backgroundImage: "url('/bg.svg')" }}
      >
        <div className="mb-6 rounded-full border-[5px] border-white">
          <img
            src="/account-icon-8.png"
            alt="Account"
            className="h-32 w-32 rounded-full bg-white"
          />
        </div>
        <div className="flex w-full max-w-[712px] flex-col p-6">
          <h2 className="mb-4 text-2xl font-bold">My profile</h2>

          <div className="w-full space-y-8 text-[#464E5F]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your first name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Your Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your last name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <div className="flex w-full justify-between gap-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-full"
                            placeholder="Your Phone Number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter your last name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="w-full"
                            placeholder="Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter your last name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>

          <hr className="my-[44px] h-[1px] border-none bg-slate-500" />

          <div className="flex justify-end">
            <Button type="submit" className="mt-[px] bg-slate-800 px-10">
              Submit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
