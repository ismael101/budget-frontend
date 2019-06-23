<template>
    <div>
        <v-layout align-center justify-end row fill-height>
                <v-container>
                <Income></Income>
                <Expenses></Expenses>
                <Savings></Savings>
                <Bills></Bills>
                </v-container>        
        </v-layout>
    </div>
</template>

<script>
import Income from '../../components/Income'
import Expenses from '../../components/Expenses'
import Savings from '../../components/Savings'
import Bills from '../../components/Bills'

export default {
    name:'Main',
    components:{
        Income,
        Savings,
        Bills,
        Expenses
    },
        

}
</script>

<style>

</style>
