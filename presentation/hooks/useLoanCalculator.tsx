import { AmortizationTableRow } from "@/infraestructure/interfaces/amortization.interface";
import { Formulario } from "@/infraestructure/interfaces/loan.form.interface";
import { useState } from "react";

export const useLoanCalculator = () => {
  //Valores del formulario provenientes de la interfaz
  const [values, setValues] = useState<Formulario>({
    monto: "",
    tasa_de_interes_corriente: "",
    plazo: "",
    fecha_desembolso: new Date(),
    tasa_svsd: "",
    tasa_interes_moratorio: "",
  });

  const [cuota, setCuota] = useState<number | null>(null);
  const [amortizationPlan, setAmortizationPlan] = useState<
    AmortizationTableRow[]
  >([]);
  const [interesMoratorio, setInteresMoratorio] = useState<number | null>(null);

  const onChange = (prop: keyof Formulario, value: any) => {
    setValues({ ...values, [prop]: value });
  };

  const calculateLoanDetails = () => {
    const p = parseFloat(values.monto);
    const annualInterestRate = parseFloat(values.tasa_de_interes_corriente);
    const n = parseInt(values.plazo, 10);
    const svsdRate = parseFloat(values.tasa_svsd);
    const moratoryRate = parseFloat(values.tasa_interes_moratorio);

    if (
      isNaN(p) ||
      isNaN(annualInterestRate) ||
      isNaN(n) ||
      p <= 0 ||
      annualInterestRate <= 0 ||
      n <= 0
    ) {
      setCuota(null);
      setAmortizationPlan([]);
      setInteresMoratorio(null);
      return;
    }

    // Tasas
    const i = annualInterestRate / 100 / 12; // Tasa de interes mensual
    const svsdMonthlyRate = isNaN(svsdRate) ? 0 : svsdRate / 100 / 12; // Tasa SVSD mensual

    // Cuota Nivelada (Capital + Inter)
    const numerator = i * Math.pow(1 + i, n);
    const denominator = Math.pow(1 + i, n) - 1;
    const calculatedCuota = p * (numerator / denominator);
    setCuota(calculatedCuota);

    // Plan de Amortizacion
    const plan: AmortizationTableRow[] = [];
    let saldo = p;
    let fechaPago = new Date(values.fecha_desembolso);

    for (let j = 1; j <= n; j++) {
      const interes = saldo * i;
      const capital = calculatedCuota - interes;
      const svsd = saldo * svsdMonthlyRate;
      const cuotaTotal = calculatedCuota + svsd;
      saldo = saldo - capital;
      fechaPago.setMonth(fechaPago.getMonth() + 1);

      plan.push({
        periodo: j,
        fechaPago: fechaPago.toLocaleDateString(),
        cuota: calculatedCuota,
        interes: interes,
        capital: capital,
        svsd: svsd,
        cuotaTotal: cuotaTotal,
        saldo: saldo < 0.01 ? 0 : saldo, // Limpiar saldo cercano a cero
      });
    }
    setAmortizationPlan(plan);

    // Interés Moratorio (creo que esta mal)
    if (!isNaN(moratoryRate) && moratoryRate > 0) {
      const dailyMoratoryRate = moratoryRate / 100 / 360;
      const dailyPenalty = calculatedCuota * dailyMoratoryRate;
      setInteresMoratorio(dailyPenalty);
    } else {
      setInteresMoratorio(null);
    }
  };

  return {
    values,
    onChange,
    cuota,
    amortizationPlan,
    interesMoratorio,
    calculateLoanDetails,
  };
};
