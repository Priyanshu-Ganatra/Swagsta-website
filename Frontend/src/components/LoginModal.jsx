import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import LoginCard from "./LoginCard"

const LoginModal = ({ isOpen, setIsOpen }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login or Sign up to continue</DialogTitle>
                </DialogHeader>

                <LoginCard />
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal