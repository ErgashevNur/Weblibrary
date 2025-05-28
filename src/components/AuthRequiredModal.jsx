import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AuthRequiredModal = ({ open }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-600">
        <DialogHeader>
          <DialogTitle>⚠️ Ro'yxatdan o'tish kerak</DialogTitle>
        </DialogHeader>
        <p className="mb-4">
          Bu sahifani ko'rish uchun iltimos ro'yxatdan o'ting yoki tizimga
          kiring.
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={() => navigate("/register")}>
            Ro'yxatdan o'tish
          </Button>
          <Button onClick={() => navigate("/login")}>Tizimga kirish</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredModal;
