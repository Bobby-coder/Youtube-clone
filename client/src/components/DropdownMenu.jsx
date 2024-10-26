import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, User, Moon, Globe, Keyboard, Settings, MapPin, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme/theme-provider"

const Dropdown = () => {
    const { theme, setTheme } = useTheme();
    console.log(theme);
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <EllipsisVertical size={24} className="cursor-pointer mx-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="capitalize"><Moon size={16} className="mr-2" /> Appearance: {theme}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("dark")}><Moon size={16}  className="mr-2"/> Dark Theme</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}><Sun size={16} className="mr-2" /> Light Theme</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setTheme("system")}>Use Device Theme</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                </DropdownMenuGroup>
            
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Globe size={16} className="mr-2" /> Language: English
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <MapPin size={16} className="mr-2" /> Location: India
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Keyboard size={16} className="mr-2" /> Keyboard shortcuts
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Your data in YouTube
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Settings size={16} className="mr-2" />
               Settings
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}
export default Dropdown;