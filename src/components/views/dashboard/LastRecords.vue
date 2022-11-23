<template lang="">
  <div>
    <base-card id="dashcard">
      <div id="container">
        <div id="left">
          <div id="first">
            <img :src="data.cat_img_url">
          </div>
          <div id="2nd">
            <p>{{data.cat_name}}</p>
            <p>{{data.acc_name}}</p>
          </div>
        </div>
        <div id="right">
          <div id="3rd">
            <div id="amount">
              <p>{{data.rec_amount}}</p>
              <p>{{data.cur_short}}</p>
            </div>
            <p id="date">{{data.datum}}</p>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>
<script>
export default {
    props: ['data'],

};
</script>
<style scoped>
#dashcard{
  padding: 0.5rem;
}
#container{
  display: flex;
  justify-content: space-between;

}
#left {
  display: flex;
  
}
#amount{
  display: flex;
}
img{
  width: 2rem; 
  height: 2rem;
  margin-right: 1rem;
  border-radius: 100%;
  overflow: hidden;
}
p{
  margin: 0.1rem;
  margin-right: 0.2rem;
}
#date{
  font-size: .9em;
    color: #7f8fa4;
}
#first{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

