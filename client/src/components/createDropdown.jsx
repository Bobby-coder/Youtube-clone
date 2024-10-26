import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Video, PlusIcon } from "lucide-react";
import { useState } from "react";
import UploadVideoModal from "./UploadVideoModal";
import { useSelector } from "react-redux";
export default function CreateDropdown() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const user = useSelector(state=>state.user.user);
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="p-2 hover:bg-hover rounded-full"><Video size={24} /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem disabled={user.channels.length==0} onClick={() => setIsUploadModalOpen(true)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    <span>Upload Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    <span>Live Stream</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <UploadVideoModal open={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
        </>
    )
}