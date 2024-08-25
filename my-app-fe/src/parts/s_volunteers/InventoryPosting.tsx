import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@mui/material";
import { useState } from "react";

interface InventoryPostingProps {
    name: string;
    consumeBy: string;
    tags: string[];
    quantity: number;
    onGiveaway: (itemName: string, giveawayAmount: number) => void;
}

const InventoryPosting: React.FC<InventoryPostingProps> = ({ name, consumeBy, tags, quantity, onGiveaway }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [giveawayAmount, setGiveawayAmount] = useState(1);

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setGiveawayAmount(1);
    };

    const handleConfirm = () => {
        if (giveawayAmount > 0 && giveawayAmount <= quantity) {
            onGiveaway(name, giveawayAmount);
        }
        setIsDialogOpen(false);
        setGiveawayAmount(1);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGiveawayAmount(parseInt(event.target.value) || 1);
    };

    return (
        <>
            <Card sx={{ border: "1px solid #77dd77" }} onClick={handleCardClick}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={"https://via.placeholder.com/300x140"}
                        alt="Placeholder image"
                        sx={{ height: 140 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Consume by: {consumeBy}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Quantity: {quantity}
                        </Typography>
                        <br />
                        {tags.map((tag: string, idx: number) => (
                            <Chip key={idx} label={tag} sx={{ marginRight: "2px " }} />
                        ))}
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog open={isDialogOpen} onClose={handleCancel}>
                <DialogTitle>Giveaway Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount to Give Away"
                        type="number"
                        fullWidth
                        value={giveawayAmount}
                        onChange={handleAmountChange}
                        inputProps={{ min: 1, max: quantity }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InventoryPosting;