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

function Security() {
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
      <section className="flex items-start justify-center gap-[99px] p-6 pl-20 pt-8">
        <div className="flex w-full max-w-[712px] flex-col p-6">
          <h2 className="mb-[32px] text-2xl font-bold">
            Change Or Recover Your Password:
          </h2>

          <div className="w-full space-y-8 text-[#464E5F]">
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
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your email.
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
                  name="currentpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full"
                          placeholder="Current Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your current password.
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
                    name="newpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="w-full"
                            placeholder="New Password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter your new password.
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
                    name="confirmpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="w-full"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter confirm password.
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
            <Button type="submit" className="mt-[px] bg-slate-600 px-10">
              Submit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Security;
