import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { ChevronDown, ChevronRight, Square, SquareCheck, SquareDot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PermissionDialogType = {
    open: boolean;
    setOpenDialog: Dispatch<SetStateAction<string | null>>;
    data: any[];
    checkedList: string[];
    handleSave: () => void;
    loading: boolean;
    setCheckedList: Dispatch<SetStateAction<string[]>>;
}

export const PermissionDialog: React.FC<PermissionDialogType> = ({ open, setOpenDialog, data, checkedList, handleSave, loading, setCheckedList }) => {
    const [expanded, setExpanded] = useState<string[]>([]);

    return (
        <Dialog open={open} onOpenChange={() => setOpenDialog(null)}>
                <DialogContent>
                    <DialogTitle>Quyền hạn</DialogTitle>
                    <DialogDescription className='flex flex-col gap-2'>
                        {
                            data && data.length > 0 &&
                            <CheckboxTree
                                nodes={data}
                                checked={checkedList}
                                expanded={expanded}
                                onCheck={c => setCheckedList(c)}
                                onExpand={e => setExpanded(e)}
                                icons={{
                                    check: <SquareCheck />,
                                    uncheck: <Square />,
                                    halfCheck: <SquareDot />,
                                    expandClose: <ChevronRight />,
                                    expandOpen: <ChevronDown />,
                                    parentClose: <ChevronRight />,
                                    parentOpen: <ChevronDown />
                                }}

                            />
                        }
                    </DialogDescription>

                    <div className='flex gap-2 justify-end'>
                        <DialogClose onClick={() => setOpenDialog(null)}>
                            <Button className='bg-gray-300 text-black hover:bg-main hover:text-white'>
                                Hủy bỏ
                            </Button>
                        </DialogClose>
                        <Button
                            className='bg-blue-500'
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Lưu thay đổi
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
    )
}