<template>
 <div class="null">
                 <img data-v-0fa74510="" src="https://wap.365msmk.com/img/empty.0d284c2e.png">
                 <p>{{title}}</p>
              </div>
</template>

<script>
export default {
    props:["title"],
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.null{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 1.96rem;
        height: 1.96rem;
        margin-bottom: 0.2rem;
    }
    p{
        font-size: 0.2rem;
    }
}
</style>
