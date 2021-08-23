export const getAddressTitle = address => {
    return `${address.BuildingNo}  ${address.Street}  ${address.Remark}  ${address.RowNo} ${address.FlatNo} `
}
export const init  =  async ctx =>{
    await ctx.$store.dispatch('global/getSettings')
    .then(async () => {
        await ctx.$store.dispatch('group/featured' )
        if(ctx.$auth.loggedIn){
            await ctx.$store.dispatch('cart/get')
            await ctx.$store.dispatch('wishlist/get')
        }
      ctx.loading = false
    })
    
  }



 export const  addParamsToLocation = (ctx , params) => {
    ctx.$store.dispatch('product/getProducts' , params)
    history.pushState(
        {},
        null,
        ctx.$route.path +
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
    }
    export const goToStore = ctx => {
        ctx.$store.commit('product/groupFilter' , {  name : null,  id : null})
        ctx.$store.commit('product/priceFrom' , null)
        ctx.$store.commit('product/priceTo' , null)
        if(ctx.$route.name !== `shop___${ctx.$i18n.locale}`){
             ctx.$router.push({name : `shop___${ctx.$i18n.locale}` , query : {}})
         } else {
             addParamsToLocation(ctx , {})
         }
     }
export const   setGroup = (ctx , group) => {
    const groupFilter = {
        id : group.id,
        name : group.groupName
    }
   ctx.$store.commit('product/groupFilter' , groupFilter)
    if(ctx.$route.name !== `shop___${ctx.$i18n.locale}`){
         ctx.$router.push({name : `shop___${ctx.$i18n.locale}` , query : {group : group.id}})
     } else {
          let query = ctx.$route.query
            query.group = group.id
        addParamsToLocation(ctx , query)
     }
}
