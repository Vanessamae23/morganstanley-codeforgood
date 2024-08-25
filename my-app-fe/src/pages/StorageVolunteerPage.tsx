import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../parts/Header';
import InventoryPosting from '../parts/s_volunteers/InventoryPosting';
import BaPosting from '../parts/s_volunteers/BaPosting';

interface InventoryItem {
    name: string;
    consumeBy: string;
    tags: string[];
    quantity: number;
}

interface BaItem extends InventoryItem {
    location: string;
    distance: number;
}

const StorageVolunteerPage: React.FC = () => {
    const [flag, setFlag] = useState(true);
    const [inventoryDataList, setInventoryDataList] = useState<InventoryItem[]>([
        {
            name: "nasi lemak",
            consumeBy: "2024-09-15",
            tags: ["Dairy", "Perishable", "Refrigerated"],
            quantity: 10,
        },
        {
            name: "Eggs",
            consumeBy: "2024-09-10",
            tags: ["Protein", "Perishable", "Refrigerated"],
            quantity: 30,
        },
        {
            name: "Bread",
            consumeBy: "2024-09-05",
            tags: ["Bakery", "Perishable"],
            quantity: 15,
        }
    ]);

    const [baDataList, setBaDataList] = useState<BaItem[]>([
        {
            name: "nasi lemak",
            location: "Social Bakery @ 97 Main St",
            distance: 0,
            consumeBy: "2024-09-04",
            tags: ["Bakery", "Perishable"],
            quantity: 15,
        },
        {
            name: "chicken rice",
            location: "ElderFoods @ 96 Main St",
            distance: 150,
            consumeBy: "2024-09-15",
            tags: ["Dairy", "Perishable", "Refrigerated"],
            quantity: 10,
        },
        {
            name: "Eggs",
            location: "EderFoods @ 96 Main St",
            distance: 150,
            consumeBy: "2024-09-10",
            tags: ["Protein", "Perishable", "Refrigerated"],
            quantity: 30,
        }
    ]);

    const handleOrder = (orderedItem: BaItem, orderQuantity: number) => {
        // Update BA item quantity
        setBaDataList(prevList =>
            prevList.map(item =>
                item.name === orderedItem.name
                    ? { ...item, quantity: item.quantity - orderQuantity }
                    : item
            )
        );

        // Add or update inventory item
        setInventoryDataList(prevList => {
            const existingItemIndex = prevList.findIndex(item => item.name === orderedItem.name);
            if (existingItemIndex !== -1) {
                // Update existing item
                return prevList.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + orderQuantity }
                        : item
                );
            } else {
                // Add new item
                return [...prevList, {
                    name: orderedItem.name,
                    consumeBy: orderedItem.consumeBy,
                    tags: orderedItem.tags,
                    quantity: orderQuantity
                }];
            }
        });
    };

    const handleGiveaway = (itemName: string, giveawayAmount: number) => {
        setInventoryDataList(prevList =>
            prevList.map(item =>
                item.name === itemName
                    ? { ...item, quantity: item.quantity - giveawayAmount }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <>
            <Header title={`Welcome, John!`} />
            <div className="p-10">
                <Typography variant="h4">
                    Fridge storage
                </Typography>
                <div className="grid grid-cols-2 md:px-48 mt-5 md:mt-16">
                    <button>
                        <Typography variant="h5"
                            className={`${flag ? 'border-b-4 border-highlight !font-bold' : 'border-b-2 border-white'} `} onClick={() => setFlag(true)}>
                            Inventory
                        </Typography>
                    </button>
                    <button>
                        <Typography variant="h5" className={`${flag ? 'border-b-2 border-white' : 'border-b-4 border-highlight !font-bold'}`} onClick={() => setFlag(false)}>
                            Food nearby
                        </Typography>
                    </button>
                </div>

                <div className={`${flag ? '' : 'hidden'} md:px-48 mt-5 md:mt-16`}>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {inventoryDataList.map((inventoryData, idx) => (
                            <InventoryPosting key={idx} {...inventoryData} onGiveaway={handleGiveaway} />
                        ))}
                    </div>
                </div>
                <div className={`${flag ? 'hidden' : ''} md:px-48 mt-5 md:mt-16`}>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {baDataList.map((baData, idx) => (
                            <BaPosting key={idx} {...baData} onOrder={handleOrder} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorageVolunteerPage;