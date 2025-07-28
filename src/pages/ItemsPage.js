import React, { useState } from "react";
import { dummyItems } from "../data/dummyItems";
import ItemStats from "../components/ItemStats";
import ItemSearchBar from "../components/ItemSearchBar";
import CreateItemModal from "../components/CreateItemModal";

const ItemsPage = () => {
  const [items, setItems] = useState(dummyItems);
  const [showModal, setShowModal] = useState(false);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const stockValue = items.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
  const lowStock = items.filter((item) => item.stock < 5).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <ItemStats stockValue={stockValue} lowStock={lowStock} />
      <ItemSearchBar onCreateClick={() => setShowModal(true)} />
      {showModal && (
        <CreateItemModal
          onClose={() => setShowModal(false)}
          onSave={addItem}
        />
      )}
    </div>
  );
};

export default ItemsPage;

