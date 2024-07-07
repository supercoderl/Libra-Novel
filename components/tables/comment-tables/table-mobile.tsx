
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionMobile } from './action-mobile';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { Comment, PermissionStates } from '@/types';

interface CommentTableProps {
    className?: string;
    data: Comment[];
    isNext: boolean;
    isPrevious: boolean;
    setPageIndex: Dispatch<SetStateAction<number>>;
    permissions: PermissionStates;
}

const CommentTable: React.FC<CommentTableProps> = ({ className, data, isNext, isPrevious, setPageIndex, permissions }) => {
    return (
        <div className={className}>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                        Analytics
                    </TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(80vh-220px)] rounded-md">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {
                                data && data.length > 0 ? (
                                    data.map((row, index) => {
                                        return (
                                            <Card key={index} className='rounded-sm'>
                                                <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between space-y-0">
                                                    <CardTitle className="text-sm font-medium">
                                                        #{row?.commentID}
                                                    </CardTitle>
                                                    <ActionMobile data={row} permissions={permissions} />
                                                </CardHeader>
                                                <CardContent className='p-3 pt-0'>
                                                    <div className="text-xl font-bold">{row?.content}</div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })) : (
                                    <p>Không có dữ liệu</p>
                                )
                            }
                        </div>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {data?.length} trên{' '}
                    {data?.length} hàng đã được chọn.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                    onClick={() => setPageIndex(prevIndex => prevIndex - 1)}
                    disabled={!isPrevious}
                    >
                        Trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                    onClick={() => setPageIndex(prevIndex => prevIndex + 1)}
                    disabled={!isNext}
                    >
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CommentTable;