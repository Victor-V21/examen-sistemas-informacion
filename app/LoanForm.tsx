import { AmortizationPlan } from "@/presentation/components/AmortizationPlan";
import { CustomInput } from "@/presentation/components/CustomInput";
import { useLoanCalculator } from "@/presentation/hooks/useLoanCalculator";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import "../global.css";

const LoanForm = () => {
  const {
    values,
    onChange,
    amortizationPlan,
    interesMoratorio,
    calculateLoanDetails,
  } = useLoanCalculator();

  const handleCalculate = () => {
    if (!values.monto || !values.tasa_de_interes_corriente || !values.plazo) {
      Alert.alert(
        "Campos Incompletos",
        "Asegúrate de llenar Monto, Tasa de Interés y Plazo."
      );
      return;
    }
    calculateLoanDetails();
  };

  const formatCurrency = (value: number) => {
    return `LPS ${value.toFixed(2)}`;
  };

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="p-4">
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <Text className="text-2xl font-bold text-center mb-6 text-blue-500">
            Prestamos la bendición
          </Text>

          <CustomInput
            label="Monto del préstamo (LPS)"
            placeholder="Ejemplo: 150000"
            keyboardType="numeric" // el tipo de numero del teclado
            value={values.monto}
            onChangeText={(text) => onChange("monto", text)}
          />
          <CustomInput
            label="Tasa de interés anual (%)"
            placeholder="Ejemplo: 19.5"
            keyboardType="numeric"
            value={values.tasa_de_interes_corriente}
            onChangeText={(text) => onChange("tasa_de_interes_corriente", text)}
          />
          <CustomInput
            label="Plazo (en meses)"
            placeholder="Ejemplo: 36"
            keyboardType="numeric"
            value={values.plazo}
            onChangeText={(text) => onChange("plazo", text)}
          />
          <CustomInput
            label="Tasa SVSD anual (%)"
            placeholder="EEjemplo: 0.45 (Opcional)"
            keyboardType="numeric"
            value={values.tasa_svsd}
            onChangeText={(text) => onChange("tasa_svsd", text)}
          />
          <CustomInput
            label="Tasa interés moratorio anual (%)"
            placeholder="Ejemplo: 10"
            keyboardType="numeric"
            value={values.tasa_interes_moratorio}
            onChangeText={(text) => onChange("tasa_interes_moratorio", text)}
          />

          <Pressable
            className="bg-yellow-500 rounded-xl p-4 mt-4"
            onPress={handleCalculate}
          >
            <Text className="text-white font-bold text-center text-lg">
              Calcular Préstamo
            </Text>
          </Pressable>
        </View>

        {amortizationPlan.length > 0 && (
          <View className="gap-y-4 mb-6">
            <View className="bg-white rounded-2xl p-4 items-center shadow-sm">
              <Text className="text-sm font-medium text-slate-500">
                Primera Cuota Total Aprox.
              </Text>
              <Text className="text-2xl font-bold text-slate-800 mt-1">
                {formatCurrency(amortizationPlan[0].cuotaTotal)}
              </Text>
            </View>
            {interesMoratorio !== null && (
              <View className="bg-white rounded-2xl p-4 items-center shadow-sm">
                <Text className="text-sm font-medium text-slate-500">
                  Penalidad Diaria por Mora
                </Text>
                <Text className="text-2xl font-bold text-slate-800 mt-1">
                  {formatCurrency(interesMoratorio)}
                </Text>
              </View>
            )}
          </View>
        )}

        <AmortizationPlan plan={amortizationPlan} />
      </View>
    </ScrollView>
  );
};

export default LoanForm;
