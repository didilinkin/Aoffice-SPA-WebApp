<template lang="pug">
div
    mu-float-button.demo-float-button( icon="add" )
    mu-float-button.demo-float-button( icon="add" mini )
    mu-float-button.demo-float-button( icon="add" secondary )
    mu-float-button.demo-float-button( icon="add" secondary mini )
    mu-float-button.demo-float-button( icon="star" disabled )
    mu-float-button.demo-float-button( icon="star" disabled mini )
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="sass">
@import "./sass/main"

.demo-float-button
    margin-right: 12px
</style>
