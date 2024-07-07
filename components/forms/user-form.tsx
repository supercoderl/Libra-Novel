'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Trash, Undo2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
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
import { useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import { Upload } from '../ui/upload';
import useAxios from '@/hooks/useAxios';
import { MultiSelect } from '../ui/multi-select';

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
    isActive: z.string().refine((val) => val === String(0) || val === String(1), {
        message: "Trạng thái chỉ trong phạm khi kích hoạt hoặc bị khóa",
    }),
    avatar: z.any(),
    roles: z.any()
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserFormProps {
    initialData: any | null;
    roles: any[];
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
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const title = initialData ? 'Cập nhật người dùng' : 'Thêm người dùng';
    const description = initialData ? 'Cập nhật thông tin của người dùng.' : 'Tạo một người dùng mới';
    const toastMessage = initialData ? 'Đã cập nhật người dùng.' : 'Tạo người dùng thành công.';
    const action = initialData ? 'Lưu thay đổi' : 'Xác nhận tạo';
    const axios = useAxios();

    const defaultValues = initialData || {
        email: '',
        firstName: '',
        lastName: '',
        passwordHash: '',
        gender: '',
        isActive: '',
        avatar: '',
    };

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    //Init
    useEffect(() => {
        if (initialData) {
            form.setValue("email", initialData.email);
            form.setValue("firstName", initialData.firstName);
            form.setValue("passwordHash", initialData.passwordHash);
            form.setValue("lastName", initialData.lastName);
            form.setValue("gender", initialData.gender);
            form.setValue("isActive", initialData.isActive);
            form.setValue("roles", initialData.roles);
            setImgUrl(initialData.avatar);
        }
    }, [initialData]);

    //Submit form
    const onSubmit = async (data: UserFormValue) => {
        try {
            setLoading(true);
            if (initialData) {
                const formData = new FormData();
                formData.append('file', data.avatar);
                formData.append('userID', initialData.userID);
                formData.append('email', initialData.email);
                formData.append('firstName', data.firstName);
                formData.append('lastName', data.lastName);
                formData.append('gender', data.gender);
                formData.append('avatar', initialData.avatar);
                formData.append('isActive', data.isActive === '1' ? 'true' : 'false');

                await axios.put(`/update-user/${initialData.userID}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            } else {
                await axios.post(`/register`, data).then(({ data }) => {
                    if (data && data.succeeded) {
                        toast({
                            variant: 'default',
                            title: 'Chúc mừng.',
                            description: toastMessage
                        });
                    }
                });
            }
            router.refresh();
            router.push(`/dashboard/user`);
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

    //Delete item
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

    //Upload image to cloud
    const onUploadImage = async (event: any, field: ControllerRenderProps<{
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        gender: string;
        isActive: string;
        avatar?: any;
    }, "avatar">) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImgUrl(url);
            field.onChange(event.target.files[0]);
        }
    }

    //Mapping roles to user
    const handleMapRole = async (value: string[]) => {
        await axios.post("/create-mapping-user-with-roles", {
            userID: initialData.userID,
            roles: value
        }).then(({ data }) => {
            if (data && data.succeeded) {
                toast({
                    variant: 'default',
                    title: 'Chúc mừng',
                    description: 'Tạo liên kết quyền đến người dùng thành công.'
                });
            }
        });
    }

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
                    <div className='flex gap-1.5 items-center'>
                        <Button
                            className="bg-green-600 w-8 h-8 p-0"
                            onClick={() => router.back()}
                        >
                            <Undo2 className="m-auto" />
                        </Button>
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="sm"
                                    className="w-8 h-8 p-0"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="m-auto" />
                        </Button>
                    </div>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className='md:grid md:grid-cols-4 gap-5'>
                        <div className="md:grid col-span-3 md:grid-cols-3">
                            <div className='gap-8 flex flex-col col-span-3'>
                                <div className='gap-8 md:grid md:grid-cols-3'>
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
                                {
                                    initialData &&
                                    <FormField
                                        control={form.control}
                                        name="roles"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vai trò</FormLabel>
                                                <MultiSelect
                                                    options={roles}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        handleMapRole(value);
                                                    }}
                                                    defaultValue={field.value}
                                                    placeholder="Chọn quyền"
                                                    variant="inverted"
                                                    className='overflow-hidden'
                                                    maxCount={5}
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                }
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ảnh đại diện</FormLabel>
                                    <FormControl>
                                        <Upload
                                            url={imgUrl || ""}
                                            onChange={(e) => onUploadImage(e, field)}
                                            accept="image/*"
                                            type='file'
                                        />
                                    </FormControl>
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