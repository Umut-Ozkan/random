# astroide

#### Tanımlama:
Modülü kullanmadan önce modülü tanımlanız gerek.
```js
const astroide = require('astroide')
```
#### Örnekler:
Kullanımla alakalı örnekler aşağıda bulunmaktadır.
 ```js
const astroide = require('astroide')
// Rastgele Sayı Üretir
astroide.number(3) // [5,2,8]

// Rastgele Oyun Üretir
astroide.oyun("seviyor_sevmiyor") // Seviyor
astroide.oyun("yazı_tura") // Tura
astroide.oyun("zar") // 6 [Altı]
astroide.slots()

//Seçtiğin kadar yada seçtiğin sayıya kadar sayı üretir.
astroide.sayi(3) // [ 12 , 72, 36]
// 3 tane 100'e kadar rastgele sayı üretir.
astroide.sayi(4, 20) // [ 19, 11, 10, 17 ]
// 4 tane 20'e kadar rastgele sayı üretir.
astroide.sayi(5, 10, 20) // [ 17, 13, 11, 12, 16 ]
// 5 tane 10 ile 20 arasında rastgele sayı üretir.

//Renk kodu üretir.
rastgele.renk() //#74317E
rastgele.renk("2") //[ '#4E7336', '#F4B236' ]
```