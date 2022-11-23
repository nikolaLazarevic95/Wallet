<template>
  <div id="wrapper">
    <div id="content">
      <div id="newLogo">
        <img id="newlogoimg" src="../../public/logo.png" />
        <div>
          <h1>Wallet</h1>
        </div>
    </div>
        <h1>404</h1>
        <!-- <img id="notpage" src="../../public/404.png" /> -->
      <p>
        Sorry, we can't find the page you're looking for. Back on Wallet Main
        page.
      </p>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  justify-content: center;
  text-align: center;
  height: 90%;
  width: 100%;
  position: absolute;
  display: flex;
}
#content {
  display: inline;
  position: absolute;
  align-items: center;
  top: 20vh;
}
h1 {
    color:#3a0061;
  font-size: 50px;
}
p {
  font-size: 24px;
  color: #3a0061;
}
#newlogoimg {
  height: 100px;
  width: 100px;
}

#newLogo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5rem;
}
#newLogo div h1 {
  font-size: 55px;
  margin: 0;
  text-align: center;
  color: #3a0061;
}
#newLogo div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#notpage{
    height: 400px;
  width: 400px;
}
</style>
