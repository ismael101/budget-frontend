<template>
    <div>
        <v-container>
            <v-card>
                <v-toolbar>
                     <v-card-title><h2>Expenses</h2></v-card-title>
                    <v-divider></v-divider>
                    <v-btn>New Expense</v-btn>
                </v-toolbar>
                <v-dialog>
                    
                </v-dialog>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            headers: [
                {
                    
                }
            ]
        }
    }

}
</script>   
<style>

</style>
