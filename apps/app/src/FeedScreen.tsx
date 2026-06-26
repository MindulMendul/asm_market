// apps/app/src/FeedScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { apiClient } from "./lib/api";

type Item = {
  id: number;
  title: string;
  price: string;
  description: string;
  images: string[];
  status: "FOR_SALE" | "RESERVED" | "SOLD";
  seller_id: string;
  created_at: string;
};

export default function FeedScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.api.items
      .$get()
      .then((data: Item[]) => {
        setItems(data ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>SOMA-MARKET Feed</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 14, padding: 14, borderRadius: 12, backgroundColor: "#f7f7f7" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ marginTop: 4, color: "#555" }}>₩{item.price}</Text>
            <Text style={{ marginTop: 8, color: "#333" }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
