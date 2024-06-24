'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import { createNewUser, editUser } from '@/app/actions/userActions';
const ImgSchema = z.object({
    fileName: z.string(),
    name: z.string(),
    fileSize: z.number(),
    size: z.number(),
    fileKey: z.string(),
    key: z.string(),
    fileUrl: z.string(),
    url: z.string()
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
    email: z
        .string()
        .email({ message: 'Hãy nhập đúng định dạng email' })
        .min(3, { message: 'Email phải ít nhất 3 ký tự' }),
    passwordHash: z
        .string()
        .min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự' }),
    firstName: z
        .string()
        .min(3, { message: 'Tên người dùng phải ít nhất 3 ký tự' }),
    lastName: z
        .string()
        .min(3, { message: 'Họ người dùng phải ít nhất 3 ký tự' }),
    gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }),
    isActive: z.string().refine((val) => val === "0" || val === "1", {
        message: "Trạng thái chỉ trong phạm khi kích hoạt hoặc bị khóa",
    })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserFormProps {
    initialData: any | null;
    roles: any;
}

export const UserForm: React.FC<UserFormProps> = ({
    initialData,
    roles
}) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit user' : 'Create user';
    const description = initialData ? 'Edit a user.' : 'Add a new user';
    const toastMessage = initialData ? 'User updated.' : 'User created.';
    const action = initialData ? 'Save changes' : 'Create';

    const defaultValues = initialData || {
        email: '',
        firstName: '',
        lastName: '',
        passwordHash: '',
        gender: '',
        isActive: ''
    };

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    useEffect(() => {
        if (initialData) {
            form.setValue("email", initialData.email);
            form.setValue("firstName", initialData.firstName);
            form.setValue("passwordHash", initialData.passwordHash);
            form.setValue("lastName", initialData.lastName);
            form.setValue("gender", initialData.gender);
            form.setValue("isActive", initialData.isActive);
        }
    }, [initialData]);

    const onSubmit = async (data: UserFormValue) => {
        try {
            setLoading(true);
            if (initialData) {
                const body = {
                    userID: initialData.userID,
                    ...data
                };

                const { passwordHash, ...removePasswordInBody } = body;

                await editUser(removePasswordInBody).then((value) => {
                    console.log(value);
                    // if (value && value.succeeded) {
                    //     toast({
                    //         variant: 'default',
                    //         title: 'Chúc mừng.',
                    //         description: 'Cập nhật thông tin người dùng thành công.'
                    //     });
                    // }
                });
            } else {
                await createNewUser(data).then((value) => {
                    if (value && value.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: 'Tạo thành công người dùng mới.'
                        });
                    }
                });
            }
            // router.refresh();
            // router.push(`/dashboard/user`);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.'
            });
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/user`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    // const triggerImgUrlValidation = () => form.trigger('imgUrl');

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    {/* <FormField
                        control={form.control}
                        name="imgUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        onChange={field.onChange}
                                        value={field.value}
                                        onRemove={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            !initialData &&
                            <FormField
                                control={form.control}
                                name="passwordHash"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Mật khẩu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Tên người dùng"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Họ người dùng"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giới tính</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        {...field}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Chọn giới tính"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* @ts-ignore  */}
                                            <SelectItem value={"Male"}>
                                                Nam
                                            </SelectItem>
                                            <SelectItem value={"Female"}>
                                                Nữ
                                            </SelectItem>
                                            <SelectItem value={"Orther"}>
                                                Khác
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trạng thái</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        {...field}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Chọn trạng thái"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* @ts-ignore  */}
                                            <SelectItem value={"1"}>
                                                Kích hoạt
                                            </SelectItem>
                                            <SelectItem value={"0"}>
                                                Bị khóa
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};