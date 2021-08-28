<template>
  <div class="sidebar">
      <v-list>
        <v-subheader>{{$t('authors')}}</v-subheader>
        <v-list-item >
          <v-text-field outlined v-model="searchAuthorPhrase" @input="searchAuthor" :label="$t('search_author')"></v-text-field>
        </v-list-item>
        <ul class="categories" v-if="authorsLoading">
            <v-skeleton-loader
                v-for="i in 8"
                :key="i + 1000"
                class="mx-auto w-full"
                max-width="300"
                :loading="authorsLoading"
                type="list-item"
            ></v-skeleton-loader>
        </ul>
        <v-list-item
          v-else
          v-for="author in localeAuthors"
          :key="author.id + 10000"
          @click.prevent="filter(author)"
          link
        >

          <v-list-item-title v-text="author.authorName"></v-list-item-title>
        </v-list-item>
        <span @click.prevent="getAuthors()" v-if="!isAuthorsFull" class="text-primary pointer mr-4">{{$t('load_more')}} <v-icon color="primary">mdi-chevron-double-down</v-icon></span>
        <span @click.prevent="getAuthors({top : 1})" v-else class="text-primary pointer mr-4">{{$t('load_less')}} <v-icon color="primary">mdi-chevron-double-up</v-icon></span>

        <v-subheader>{{$t('categories')}}</v-subheader>
        <ul class="categories" v-if="loading">
            <v-skeleton-loader
                v-for="i in 8"
                :key="i + 100000"
                class="mx-auto w-full"
                max-width="300"
                :loading="loading"
                type="list-item"
            ></v-skeleton-loader>
        </ul>
        <v-list-item
          v-else
          v-for="group in groups"
          :key="group.id + 1000000"
          @click.prevent="filter(group)"
          link
        >

          <v-icon>mdi-{{group.icon}}</v-icon>
          <v-list-item-title v-text="group.groupName"></v-list-item-title>
        </v-list-item>
         
        <v-subheader>{{$t('price')}}</v-subheader>
        <v-list-item>
          <v-row>
            <v-col cols="12">
              <div class="d-flex">
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                {{$t('currency')}}
                <v-text-field @change="setPrice" v-model="price[0]" dark class="price-filter"></v-text-field>
                 <!-- {{ $n(price[0], 'currency' , 'en') }}  -->
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="primary"
                  
                >
                {{$t('currency')}}
                <v-text-field @change="setPrice" v-model="price[1]" dark class="price-filter"></v-text-field>
                <!-- {{ $n(price[1], 'currency' , 'en') }} -->
                </v-chip>

              </div>
            </v-col>
            <v-col cols="12">
              <v-range-slider
                v-model="price"
                @change="setPrice"
                dense
                max="500"
                min="0"
              ></v-range-slider>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
  </div>
</template>

<script>
// import filters from '@/mixins/filters.js'
import {mapGetters} from 'vuex'
// import addParamsToLocation from '@/utilities/helpers.js'
  export default {
    computed:{
      ...mapGetters({
         groups: 'group/groups',
         authors: 'global/authors',
         authorsLoading: 'global/authorsLoading',
         loading: 'group/loading',
       }),
    },
    data(){
      return{
        isAuthorsFull:false,
        searchAuthorPhrase: "",
        localeAuthors: [],
        price: [0, 500],
      }
    },
    methods:{
      searchAuthor(){
        this.localeAuthors = this.authors.filter(author => {
          console.log(author.authorName)
          return author.authorName.indexOf(this.searchAuthorPhrase) !==  -1
          
          })
      },
      addParamsToLocation(params) {
        this.$store.dispatch('product/getProducts' , params)
        history.pushState(
            {},
            null,
            this.$route.path +
            '?' +
            Object.keys(params)
                .map(key => {
                return (
                    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                )
                })
                .join('&')
        )
        window.scrollTo({ top:0, behavior: 'smooth'});
      },
      filter(group){
          const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
          const groupFilter = {
            id : group.id,
            name
          }
          console.log(groupFilter)
          this.$store.commit('product/groupFilter' , groupFilter)

            if(this.$route.name == `shop___${this.$i18n.locale}`){
                let query = this.$route.query
                query.group = group.id
                this.addParamsToLocation(query)
            } else {
                this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
            }
      },
      filterPriceFrom(price){
            if(this.$route.name == `shop___${this.$i18n.locale}`){
                let query = this.$route.query
                query.priceFrom = price
            } else {
                this.$router.push({name : `shop___${this.$i18n.locale}` , query : {priceFrom : price}})
            }
      },
      filterPriceTo(price){
            if(this.$route.name == `shop___${this.$i18n.locale}`){
                let query = this.$route.query
                query.priceTo = price
                this.addParamsToLocation(query)
            } else {
                this.$router.push({name : `shop___${this.$i18n.locale}` , query : {priceTo : price}})
            }
      },
      getAuthors(payload = null){
        this.isAuthorsFull = payload ==null ?  true : false
        this.$store.dispatch('global/getAuthors' , payload)
        .then(res => {
          this.localeAuthors = res
        })
      },
      setPrice(){
        this.filterPriceFrom(this.price[0])
        this.filterPriceTo(this.price[1])
      }
    },
    created(){
      let price = [0 , 500]
        if(this.$route.query.priceFrom){
          price[0] = this.$route.query.priceFrom
        }
        if(this.$route.query.priceTo){
          price[1] = this.$route.query.priceTo
        }

      this.price = price
      this.getAuthors({top:  1});
    }
    
  }
</script>
<style>
.price-filter input{
  max-width: 50px !important;
  text-align: center;
}
.price-filter .v-text-field > .v-input__control > .v-input__slot::after{
  display: none !important;
}
</style>