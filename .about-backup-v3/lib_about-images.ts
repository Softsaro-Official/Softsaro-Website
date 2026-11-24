export type AboutImg = { src: string; w: number; h: number; blur: string };

export const aboutImg = {
  "teamNine": {
    "src": "/images/about/team-nine.webp",
    "w": 1280,
    "h": 960,
    "blur": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAwBQCdASoYABIAPu1qqk8ppiOiMBgIATAdiWMAwPxwARtm6aU//5fBoKkstyXsEbE7gAD+X0r5KB7KGOpejra6p7JdlrDkkzJKHmbqnQS7nRgVJc2Iie9dAFZ0tqGm3lQDrVFJma+FejHJocJ4rBiwROv7FOP2UBIqfqNK3cBN/gAA"
  },
  "teamFour": {
    "src": "/images/about/team-four.webp",
    "w": 1280,
    "h": 960,
    "blur": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADwBACdASoYABIAPu1qrVEppaQiqAqpMB2JYwAAKt2e9e1n8+bWFfu6deFcEJrzwwAA9GGjOKF3RJhCFiq8gev2CVU3W2nUmh1wpS8Kz5PAe1562/7mVO1Ge+XkYjKV21Mn1PiqaQzTapfNS1oBxROMplN1KzRxAg+mJ/b1hIv9Ysm8APzsEAAA"
  },
  "teamSeven": {
    "src": "/images/about/team-seven.webp",
    "w": 1200,
    "h": 1168,
    "blur": "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAACwBQCdASoYABcAPu1eqU4ppKOiMBgMATAdiUAYVBf4Ls2paBkR0RhxQyVi/rIbocHUutwnjAAA/sOS5xxPgnZeMJktMwR1KA+nTGClfLqhLWGJVJ0RfCJK7pPyQGt1F+LTO8VSjPBxtMfcJisoCEmJOUg5611GHDq9dHhFYn0crIH2p3ewOKEit60PvOWELFFL40YZVdOGUztX46obAGI9nQjQAAAA"
  },
  "founder": {
    "src": "/images/about/founder.webp",
    "w": 1000,
    "h": 1000,
    "blur": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAABQBQCdASoYABgAPu1qq1EppaOiqAqpMB2JZAC/OBDRs3hWhVHD7KygX/dqg/ouVm+R1kAA/tjsElVAWZHgdTgkIks7PLaCdZ2K8a5EtS7e3jD67v34eamkyIsSKyq2cSk77Wnh8tziTIduMSy7bFKK/yjhw2SgiAA="
  }
} satisfies Record<string, AboutImg>;
