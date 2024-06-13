<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <footer class="footer">
    <div class="footer-content">
      <a href="https://www.onologistics.com/" target="blank">
        <img src="@/assets/logo.png" alt="Logo" class="footer-logo" />
      </a>

      <div class="footer-info">
        <p>
          Copyrights
          <a href="https://it.wikipedia.org/wiki/Copyright_Act" target="_blank">&copy;</a> 2024
          Tutti i diritti riservati a ONO LEAN LOGISTICS.
        </p>
        <p>Via Maestri del Lavoro, 16 37059 Santa Maria di Zevio, Verona, Italia</p>
        <p>Email: SALES@ONOLOGISTICS.COM | Phone: +390456050205</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  width: 100%;
  padding: 15px 25px;
  background-color: #333333b8;
  color: #fff;
  text-align: center;
  position: fixed;
  margin-top: auto;
  bottom: 0;
  left: 0;
  right: 0;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.footer-logo {
  height: 140px;
  width: auto;
}
.footer-info {
  text-align: right;
}
.footer-info p {
  margin: 0;
  padding: 0;
}
.footer-spacing {
  height: 300px;
}
</style>
