"use client"

import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Chào mừng trở lại 👋
                    </h2>
                    <div className="hidden items-center space-x-2 md:flex">
                        <CalendarDateRangePicker />
                        <Button>Download</Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Phân tích
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Tổng số tài liệu
                                    </CardTitle>
                                    <svg
                                        fill="#000000"
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M20,6.52897986 L20,19.5010024 C20,20.8817143 18.8807119,22.0010024 17.5,22.0010024 L6.5,22.0010024 C5.11928813,22.0010024 4,20.8817143 4,19.5010024 L4,4.50100238 C4,3.1202905 5.11928813,2.00100238 6.5,2.00100238 L15.4720225,2.00100238 C15.6047688,1.99258291 15.7429463,2.03684187 15.8535534,2.14744899 L19.8535534,6.14744899 C19.9641605,6.25805611 20.0084195,6.39623363 20,6.52897986 Z M15,3.00100238 L6.5,3.00100238 C5.67157288,3.00100238 5,3.67257525 5,4.50100238 L5,19.5010024 C5,20.3294295 5.67157288,21.0010024 6.5,21.0010024 L17.5,21.0010024 C18.3284271,21.0010024 19,20.3294295 19,19.5010024 L19,7.00100238 L15.5,7.00100238 C15.2238576,7.00100238 15,6.77714475 15,6.50100238 L15,3.00100238 Z M16,3.70810916 L16,6.00100238 L18.2928932,6.00100238 L16,3.70810916 Z M8.5,10 C8.22385763,10 8,9.77614237 8,9.5 C8,9.22385763 8.22385763,9 8.5,9 L15.5,9 C15.7761424,9 16,9.22385763 16,9.5 C16,9.77614237 15.7761424,10 15.5,10 L8.5,10 Z M8.5,13 C8.22385763,13 8,12.7761424 8,12.5 C8,12.2238576 8.22385763,12 8.5,12 L15.5,12 C15.7761424,12 16,12.2238576 16,12.5 C16,12.7761424 15.7761424,13 15.5,13 L8.5,13 Z M8.5,16 C8.22385763,16 8,15.7761424 8,15.5 C8,15.2238576 8.22385763,15 8.5,15 L13.5,15 C13.7761424,15 14,15.2238576 14,15.5 C14,15.7761424 13.7761424,16 13.5,16 L8.5,16 Z" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">45,231 truyện</div>
                                    <p className="text-xs text-muted-foreground">
                                        +20.1% so với tháng trước
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Khách đăng ký
                                    </CardTitle>
                                    <svg
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 24 24"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <title>group_line</title>
                                        <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="User" transform="translate(-480.000000, 0.000000)">
                                                <g id="group_line" transform="translate(480.000000, 0.000000)">
                                                    <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero">

                                                    </path>
                                                    <path d="M13,13 C15.2091,13 17,14.7909 17,17 L17,19 C17,19.5523 16.5523,20 16,20 C15.4477,20 15,19.5523 15,19 L15,17 C15,15.8954 14.1046,15 13,15 L6,15 C4.89543,15 4,15.8954 4,17 L4,19 C4,19.5523 3.55228,20 3,20 C2.44772,20 2,19.5523 2,19 L2,17 C2,14.7909 3.79086,13 6,13 L13,13 Z M18.9999,13.0002 C20.6568,13.0002 21.9999,14.3434 21.9999,16.0002 L21.9999,18.0002 C21.9999,18.5525 21.5522,19.0002 20.9999,19.0002 C20.4477,19.0002 19.9999,18.5525 19.9999,18.0002 L19.9999,16.0002 C19.9999,15.448 19.5522,15.0002 18.9999,15.0002 L17.5841,15.0002 C17.2362,14.204 16.687,13.5159 16.0008,13.0002 L18.9999,13.0002 Z M9.49998,3 C11.9853,3 14,5.01472 14,7.5 C14,9.98528 11.9853,12 9.49998,12 C7.01469,12 4.99998,9.98528 4.99998,7.5 C4.99998,5.01472 7.01469,3 9.49998,3 Z M18,6 C19.6569,6 21,7.34315 21,9 C21,10.6569 19.6569,12 18,12 C16.3431,12 15,10.6569 15,9 C15,7.34315 16.3431,6 18,6 Z M9.49998,5 C8.11926,5 6.99998,6.11929 6.99998,7.5 C6.99998,8.88071 8.11926,10 9.49998,10 C10.8807,10 12,8.88071 12,7.5 C12,6.11929 10.8807,5 9.49998,5 Z M18,8 C17.4477,8 17,8.44772 17,9 C17,9.55228 17.4477,10 18,10 C18.5523,10 19,9.55228 19,9 C19,8.44772 18.5523,8 18,8 Z" id="形状" fill="#09244B">

                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2350</div>
                                    <p className="text-xs text-muted-foreground">
                                        +180.1% so với tháng trước
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Bình luận mới</CardTitle>
                                    <svg
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 text-muted-foreground"
                                        xmlns="http://www.w3.org/2000/svg"
                                    ><path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" /></svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% so với tháng trước
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Thời gian hoạt động
                                    </CardTitle>
                                    <svg
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 text-muted-foreground"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fillRule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,6 C12.5128358,6 12.9355072,6.38604019 12.9932723,6.88337887 L13,7 L13,11.5857864 L14.7071068,13.2928932 C15.0976311,13.6834175 15.0976311,14.3165825 14.7071068,14.7071068 C14.3466228,15.0675907 13.7793918,15.0953203 13.3871006,14.7902954 L13.2928932,14.7071068 L11.2928932,12.7071068 C11.1366129,12.5508265 11.0374017,12.3481451 11.0086724,12.131444 L11,12 L11,7 C11,6.44771525 11.4477153,6 12,6 Z" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">141 giờ</div>
                                    <p className="text-xs text-muted-foreground">
                                        Lần đăng nhập cuối: 14-07-2024
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Tổng quan tài liệu</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-4 md:col-span-3">
                                <CardHeader>
                                    <CardTitle>Bình luận gần đây</CardTitle>
                                    <CardDescription>
                                        Bạn có 256 tổng bình luận trong tháng này.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}