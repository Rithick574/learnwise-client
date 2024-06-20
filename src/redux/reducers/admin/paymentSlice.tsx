import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPayments } from "@/redux/actions/admin/paymentAction"; 

interface PaymentsState {
    loading: boolean;
    payments: any[]; 
    error: any; 
    totalAvailablePayments: number;
}

const initialState: PaymentsState = {
    loading: false,
    payments: [],
    error: null,
    totalAvailablePayments: 0, 
};

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPayments.fulfilled, (state, { payload }: PayloadAction<{ formattedPayments: any[], totalAvailablePayments: number }>) => {
                state.loading = false;
                state.error = null;
                state.payments = payload.formattedPayments;
                state.totalAvailablePayments = payload.totalAvailablePayments;
            })
            .addCase(getPayments.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.payments = [];
                state.error = action.payload; 
            });
    },
});

export const paymentsReducer = paymentsSlice.reducer;
