import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '@/store';

// Zod 스키마 정의
const formSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
});

const SignupPage = () => {
  const navigator = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { user, signUp, loading } = useAuthStore();
  console.log('[회원가입페이지] user: ', user);
  if (user) {
    navigator('/login');
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // TODO: API Call
    const body = {
      ...data,
      image: '../../../public/prettier.jpeg'
    };
    await signUp(body);
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <h1 className="text-3xl font-semibold text-center">회원가입</h1>
      <div className="mt-8 p-6 shadow-lg bg-white rounded-lg ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="이메일" {...field} />
                  </FormControl>
                  {/* <p>{form.formState.errors.email?.message}</p> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="이름" {...field} />
                  </FormControl>
                  {/* <p>{form.formState.errors.name?.message}</p> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="비밀번호" {...field} type="password" />
                  </FormControl>
                  {/* <p>{form.formState.errors.password?.message}</p> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              회원가입
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-700">
            <span>아이디가 있다면?</span>
            <Link to="/login" className="font-medium">
              로그인
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default SignupPage;
