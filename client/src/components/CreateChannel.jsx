import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';

const CreateChannelDialog = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState(user.firstName + ' ' + user.lastName);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [channelHandle, setChannelHandle] = useState(user.email.split('@')[0]);
  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      setLoading(true);
      if (channelName.trim() === '') {
        setError('Channel name is required.');
        return;
      }

      // Upload avatar if it exists
      let avatarUrl = null;
      if (avatar) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const avatarResponse = await axios.post('http://localhost:8000/api/upload/avatar', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        avatarUrl = avatarResponse.data.fileUrl;
      }

      const response = await axios.post('http://localhost:8000/api/channel/create', 
        { 
          channelId: channelHandle, 
          channelName: channelName,
          ...(avatarUrl ? { avatar: avatarUrl } : {})
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser({
          ...user,
          channels: [
            ...(user.channels || []),
            { _id: response.data.newChannel._id, handle: response.data.channelId }
          ],
          channel: response.data.newChannel
        }));
        setOpen(false);
        setChannelName('');
        setChannelHandle('');
        setAvatar(null);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Create Channel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>How you will appear</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 space-y-5">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} />
                <AvatarFallback>{channelName ? channelName[0].toUpperCase() : 'C'}</AvatarFallback>
              </Avatar>
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channelName" className="text-right">
              Name
            </Label>
            <Input
              id="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channelHandle" className="text-right">
              Handle
            </Label>
            <Input
              id="channelHandle"
              value={channelHandle}
              onChange={(e) => setChannelHandle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create Channel'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
