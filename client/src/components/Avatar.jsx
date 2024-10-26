import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Laptop, User, UserPlus, LogOut, Video, Crown, CreditCard, Database, Languages, MapPin, Keyboard, Settings } from "lucide-react"
import { useTheme } from "@/lib/theme/theme-provider"
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import CreateChannelDialog from "./CreateChannel"
import { Link } from "react-router-dom"
import axios from "axios"
import { setLogout } from "@/redux/userSlice"
import { useDispatch } from "react-redux"
const AvatarComponent = () => {
    const { theme, setTheme } = useTheme();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const token = Cookies.get("authtoken");
    console.log(token);
    const handleLogout = async() => {
        try {
          const response = await axios.post(
            "https://youtube-backend-eight.vercel.app/api/user/logout", 
            {}, 
            { withCredentials: true } 
          );
      
          if (response.data.success) {
            dispatch(setLogout());
            // Attempt to remove cookie client-side, with correct options
            Cookies.remove("authtoken", { path: '/', sameSite: 'None', secure: true });
          } else {
            console.log(response.data.message);
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };
      
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gray-500 text-white">{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-start">
                            <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                            <span className="text-xs text-gray-500 mt-1">{`${user.channels.length>0 ? user.channels[0]?.handle : user.email}`}</span>
                            {user.channels.length > 0 ? <Link to="/channel"><DropdownMenuItem className="text-xs text-blue-500 mt-1" >View your channel</DropdownMenuItem></Link> : <CreateChannelDialog />}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem disabled>
                            <User className="mr-2" size={16} />
                            Google Account
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <UserPlus className="mr-2" size={16} />
                            Switch Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            handleLogout();
                        }}>
                            <LogOut className="mr-2" size={16} />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem disabled>
                            <Video className="mr-2" size={16} />
                            YouTube Studio
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <Crown className="mr-2" size={16} />
                            YouTube Premium
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <CreditCard className="mr-2" size={16} />
                            Purchases and Memberships
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><Moon className="mr-2" size={16}/> Appearance: {theme === "dark" ? "Dark" : "Light"}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}><Moon className="mr-2" size={16}/> Dark Theme</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("light")}><Sun className="mr-2" size={16}/> Light Theme</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setTheme("system")}><Laptop className="mr-2" size={16}/> Use Device Theme</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                        <Database className="mr-2" size={16} />
                        Your data in YouTube
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem disabled>
                        <Languages className="mr-2" size={16} />
                        Language
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <MapPin className="mr-2" size={16} />
                        Location
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Keyboard className="mr-2" size={16} />
                        Keyboard shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <Settings className="mr-2" size={16} />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}

export default AvatarComponent;
