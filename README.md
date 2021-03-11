
# Palta users api

 **Requerimientos**
 
> Mongodb

> NodeJS +10

 **Instalación**
 Pararse en la carpeta principal y correr en consola:
  >`npm install`
  > 
  **Renombrar el 
  archivo ".env_example" a ".env"**
  

 **Iniciar backend en entorno desarrollo**
 Pararse en la carpeta principal y correr en consola:
  >`npm run dev`

**Iniciar backend en entorno producción**
 Pararse en la carpeta principal y correr en consola:
  >`npm run build`
  >Al terminar de compilar correr:
  >`npm run start`

## Endpoints
**USUARIO**

POST
>`/api/`  `user`/  `add` 
>>Recibe body (Obligatorio)
>
	{
		name: STRING,
		password: STRING,
		email: STRING
	}
	
POST
>`/api/`  `user`/  `login` 
>>Recibe body (Obligatorio)
>
	{
		email
		password
	}
	
	
DELETE
>`/api/`  `user`/  `remove` 
>>Recibe:
>
	{
		_id:
	}
>



	
