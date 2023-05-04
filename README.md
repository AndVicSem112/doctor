# doctor

1. **Создание пациента**

**POST http://localhost:3000/user**

**{**

`    `**"phone" : "89683333333",**

`    `**"name" : "Вася"**

**}**

1. **Создание доктора**

**POST http://localhost:3000/doctor**

**{**

`    `**"spec" : "Хирург",**

`    `**"name" : "Брат Болоди",**

`    `**"slots" : ["0505\_0900", "0505\_0930", "0505\_1000", "0505\_1550" ]**

**}**

1. **Запись на приём**

**POST http://localhost:3000/make**

**{**

`    `**"user\_id" : "14c72953-8985-4aba-8707-497abe7587d8",**

`    `**"doctor\_id" : "96ab0a55-8f89-48df-9dce-6afecbf0f2b0",**

`    `**"slot" : "0505\_1430"**

**}**

