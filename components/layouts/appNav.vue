
<template>
    <nav class="nav">
        <div class="top">
            <v-container>
                <div class="d-flex items-center space-between w-full">
                   <ul class="d-flex left">
                       
                        <li>
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{settings.address}}
                        </li>
                   </ul>
                    <ul class="d-flex right">
                        <li class="b-right pointer"  v-if="$auth.loggedIn" @click.prevent="$router.push({name : `account___${$i18n.locale}`})">
                            <a>
                                <v-icon >
                                    mdi-account-outline
                                </v-icon>
                                {{$auth.user.user.name}}
                            </a>
                        </li>
                        <li class="b-right pointer"  v-else @click.prevent="$router.push({name : `login___${$i18n.locale}`})">
                            <a>
                                
                                    <v-icon >
                                        mdi-account-outline
                                    </v-icon>
                               
                            {{$t('login-rgister')}}
                            </a>
                        </li>
                        <li class="b-right"  @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})">
                            <!-- <v-icon class="mr-2" >mdi-cart-arrow-down</v-icon> -->
                            <a
                            >
                                <v-badge
                                    :content="count"
                                    :value="count"
                                    color="primary"
                                    left
                                    
                                >
                                    <v-icon >
                                    mdi-cart-arrow-down
                                    </v-icon>
                                </v-badge>
                            {{$t('cart')}}
                            </a>
                        </li>
                        
                        <ul class="d-flex items-center socials pointer">
                            <li @click.prevent="link.url" v-for="(link , index) in links" :key="index">
                                <v-icon medium>mdi-{{link.icon}}</v-icon>
                            </li>
                        </ul>
                    </ul>
                </div>
            </v-container>
        </div>
        <div class="bottom" ref="nav">
            <v-container>
                <div class="nav d-flex space-between items-center">
                    <nuxt-link to="/" class="logo">
                        <img :src="settings.logo">
                    </nuxt-link>

                    <div class="links">
                        <ul class="d-flex">
                            <li>
                                <nuxt-link :to="{name: `index___${$i18n.locale}`}" >
                                    {{$t('home')}}
                                </nuxt-link>
                            </li>
                            <li>
                                <a @click.prevent="goToStore()" >
                                    {{$t('Store')}}
                                </a>
                            </li>
                             <li v-for="group in groups" :key="group.id">
                                <a @click.prevent="setGroup(group)">
                                    {{group.groupName}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search">
                        <layouts-search/>
                    </div>
                </div>
            </v-container>
        </div>
    </nav>
</template>


<script>
import { mapGetters } from 'vuex'
import {setGroup , goToStore} from '@/utilities/helpers.js'
export default {
    data(){
        return {
            items : ['asd'],
            isLoading : false,
            term : '',
        }
    },
    watch:{
        term: newVal => {
            console.log(newVal)
        } 
    },
    methods: {
        
        handleScroll () {
        // Your scroll handling here
            if(window.scrollY > 145){
                this.$refs.nav.classList.add('fixed')
                // document.querySelector('main.v-main').classList().add('fixed-nav')
            } else {
                this.$refs.nav.classList.remove('fixed')
                // document.querySelector('main.v-main').classList().remove('fixed-nav')

            }
        },
        search(val){
            console.log('asd')
            console.log(val)
        },
        setGroup(group){
            setGroup(this , group)
        },
        goToStore(){
           goToStore(this)
        },
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    computed:{
        ...mapGetters({
            groups: 'group/featuredGroups',
            count: 'cart/cartCount',
            loading: 'product/loading',
            filtersParams: 'product/filtersParams',
            links : 'global/links',
            settings : 'global/settings'

        })
    },
   
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style scoped src="@/assets/scss/layouts/nav.css"/>
