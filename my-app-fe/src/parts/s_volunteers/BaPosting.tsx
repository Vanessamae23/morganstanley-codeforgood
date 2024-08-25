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
    CircularProgress,
} from "@mui/material";
import { useState } from "react";

interface BaPostingProps {
    name: string;
    location: string;
    distance: number;
    consumeBy: string;
    tags: string[];
    quantity: number;
    onOrder: (item: BaPostingProps, orderQuantity: number) => void;
}

const BaPosting: React.FC<BaPostingProps> = (props) => {
    const { name, consumeBy, tags, quantity, distance, location, onOrder } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [isPending, setIsPending] = useState(false);

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setOrderQuantity(1);
        setIsPending(false);
    };

    const handleOrder = () => {
        setIsPending(true);
        setTimeout(() => {
            onOrder(props, orderQuantity);
            setIsDialogOpen(false);
            setIsPending(false);
            setOrderQuantity(1);
        }, 5000);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderQuantity(parseInt(event.target.value) || 1);
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
                        <Typography variant="body2" className="!font-bold">
                            {location}
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
                    <div className="absolute top-2 left-2 bg-highlight p-2 rounded-md">
                        <Typography className="!italic">{distance}m</Typography>
                    </div>
                </CardActionArea>
            </Card>

            <Dialog open={isDialogOpen} onClose={handleCancel}>
                <DialogTitle>{isPending ? "Order Pending" : "Order Item"}</DialogTitle>
                <DialogContent>
                    {isPending ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                            <CircularProgress />
                            <Typography variant="body2" style={{ marginLeft: '10px' }}>Please wait for the beneficiary to verify your order...</Typography>
                        </div>
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Order Quantity"
                                type="number"
                                fullWidth
                                value={orderQuantity}
                                onChange={handleQuantityChange}
                                inputProps={{ min: 1, max: quantity }}
                            />
                        </>
                    )}
                </DialogContent>
                {!isPending && (
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleOrder} color="primary" variant="contained">
                            Place Order
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
};

export default BaPosting;