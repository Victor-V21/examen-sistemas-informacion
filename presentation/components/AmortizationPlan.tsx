import { AmortizationTableRow } from "@/infraestructure/interfaces/amortization.interface";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface Props {
  plan: AmortizationTableRow[];
}

export const AmortizationPlan = ({ plan }: Props) => {
  if (plan.length === 0) {
    return null;
  }

  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  const renderHeader = () => (
    <View className="flex-row bg-slate-200 p-2 rounded-t-lg">
      <Text className="p-2 font-bold text-slate-700">#</Text>
      <Text className="p-2 font-bold text-slate-700">Fecha</Text>
      <Text className="p-2 font-bold text-slate-700 text-right">Cap+Int</Text>
      <Text className="p-2 font-bold text-slate-700 text-right">SVSD</Text>
      <Text className="p-2 font-bold text-slate-700 text-right">
        Pago Total
      </Text>
      <Text className="p-2 font-bold text-slate-700 text-right">Saldo</Text>
    </View>
  );

  const renderItem = ({ item }: { item: AmortizationTableRow }) => (
    <View className="flex-row p-2 border-b border-slate-200">
      <Text className="p-1 text-slate-600">{item.periodo}</Text>
      <Text className="p-1 text-slate-600">{item.fechaPago}</Text>
      <Text className="p-1 text-slate-600 text-right">
        {formatCurrency(item.cuota)}
      </Text>
      <Text className="p-1 text-slate-600 text-right">
        {formatCurrency(item.svsd)}
      </Text>
      <Text className="p-1 font-semibold text-slate-800 text-right">
        {formatCurrency(item.cuotaTotal)}
      </Text>
      <Text className="p-1 text-slate-600 text-right">
        {formatCurrency(item.saldo)}
      </Text>
    </View>
  );

  return (
    <View className="bg-white rounded-2xl shadow-md p-1">
      <Text className="text-xl font-bold text-slate-800 p-4">
        Plan de Amortización
      </Text>
      <FlatList
        data={plan}
        renderItem={renderItem}
        keyExtractor={(item) => item.periodo.toString()}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        className="max-h-96"
      />
    </View>
  );
};
