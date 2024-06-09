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
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store';

// Zod 스키마 정의
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
});

const LoginPage = () => {
  const navigator = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });
  const { user, isAuth, singIn, loading } = useAuthStore();
  console.log('[로그인페이지] isAuth: ', isAuth);
  if (isAuth) {
    navigator('/');
  }

  // if (error) return <p className="text-red-500">{error}</p>;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // TODO: API Call
    const body = {
      ...data
    };
    const result = await singIn(body);
    console.log('[login] result: ', result);
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <h1 className="text-3xl font-semibold text-center">로그인</h1>
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
                    <Input
                      placeholder={`${user?.email || '이메일'}`}
                      {...field}
                    />
                  </FormControl>
                  {/* <p>{form.formState.errors.email?.message}</p> */}
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
              로그인
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-700">
            <span>아이디가 없다면?</span>
            <Link to="/signup" className="font-medium">
              회원가입
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
