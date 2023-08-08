const barbaSettings = {
  transitions: [
    {
      // "home" is used in the transition class attribute.
      name: "home",
      once() {},
    },
    {
      // "fade" is used in the transition class attribute.
      name: "fade",
      to: {
        namespace: ["barbaPage"],
      },
      beforeLeave(data) {},
      leave() {},
      afterLeave() {
        navigation.init();
      },
      enter() {},
    },
  ],
};

export default barbaSettings;