# Hidoc-meteor-react

Mocking a full-stack application using Meteor and React

## Prerrequisitos

Para trabajar correctamente, este proyecto requiere:
- [Meteor CLI](https://www.meteor.com/install)
- [Node](https://nodejs.org/es/)

## Correr en entorno local

### Para correr el proyecto

Dentro de la carpeta del proyecto, usar los comandos

``` bash
# Instala dependencias
npm install

# Correr un servidor de desarrollo
meteor run
```

El proyecto se encontrará corriendo en el puerto `3000` (default de meteor).

### Acceder

Puedes testear el proyecto con alguno de los siguientes usuarios
- User: 'hidoc', password: 'hidoc-password'
- User: 'dev', password: 'go-stackoverflow'

Diviértete!

## Analisis

Como se me fué pedido, haré un pequeño análisis de lo que realicé, describiendo mis pasos y experiencia, así como pros y contras del proyecto

### Arquitectura

Meteor es un framework full-stack, y se apoya en diferentes tecnologías para lograr su cometido.

Su idea es tener el "codebase" de todo en el mismo lugar, de forma que se pueda re-utilizar código y se compile para varias plataformas sin hacer mucho más esfuerzo.

Y, como todo, tiene sus ventajas y desventajas. Lo que mostraré aquí es desde mi punto de vista, lo que he apreciado.

**Ventajas**
- Es flexible, permite usar los frameworks o heramientas que desees
- Se re-utiliza el código, de forma que no hay pérdidas de tiempo compilando para diversas platafomas
- Los módulos incluidos por Meteor facilitan mucho el trabajo
- Fácil integración de código Frontend y Backend
- No hay necesidad de declarar endpoints, ya se puede acceder a los datos desde frontend y backend con (Casi) los mismos métodos
- Automatización del sistema de autenticación y otros más, de forma que se tiene acceso fácil a los datos
- Prototipado muy fácil y rápido 


**Desventajas**
- No hay instalación via NPM. El gestor de paquetes interno de Meteor es suyo. No parece abierto.
- La compilación no es nativa, de forma que los archivos resultantes quedan pesados y no están optimizados para el dispositivo
- Se incluye automáticamente código de Meteor que, en ocasiones (Al menos desde mi punto de vista) es un poco borroso el qué hace en realidad. Baja personalización en ese sentido.
- En casos de conexión a datos se te restringe un poco, por que solo puedes usar los métodos de Meteor
- El método 'publish' solo permite, hasta donde noté, el acceso a cursores.
- Al parecer solo viene incluido MongoDB como gestor de datos



Otras ventajas y desventajas, independientes de la arquitectura

**Ventajas**
- El useTracker parece ser una maravilla. Checaré más

**Desventajas**
- La documentación y ejemplos son de calidad media. No demasiado explícita en cuanto a detalles y ejemplos
- La comunidad no es tan grande. Muchos de los paquetes que busqué tuvieron su última actualización en el 2019
- No veo que tenga un linter integrado, investigaré más
- No muestra errores de compilación del frontend en la consola

### Mi experiencia desarrollando

A lo largo de lo que llevo desarrollando el proyecto, me encontré con varios problemas. Para empezar, seguí un el tutorial un tanto desacoplado a él, sin conocer el framework del todo, lo que me supuso contratiempos.

La primera parte fué fácil: Acceder a los métodos desde ambos lugares, frontend y backend. Cómo el framework usa los datos. Integración con react. Todo "suave".

#### Primer problema

El primer problema fué al intentar utilizar los Meteor Methods, el ejemplo [aqui](https://guide.meteor.com/methods.html#advanced-boilerplate)

Algunas de las dudas y problemas que tuve fueron:
- Donde se llaman?
- Qué hace que el server los detecte?
- Diferencias a llamarlos desde Frontend y Backend?
- Si se exportan y se importan desde otro módulo, cómo llamarles sin que choquen entre ellos?

Y bueno perdí tiempo dado que no podía hacer funcionar bien ese módulo. Hasta que usé [este otro enfoque](https://guide.meteor.com/methods.html#validated-method)

#### Segundo problema

El segundo problema fué que, dado que me desacoplé del tutorial y hice los meteor methods exportables, en lugar de algunos datos expuestos como cursores, no podía hacer 'publish' y 'subscribe' a ellos y que hubiera una respuesta

Algunas de mis dudas fueron y son

- Qué llamo desde el cliente? Call, Run...?
- Cómo interactúan con el useTracker? Qué es lo que registro en él y que es lo que trackea? (El ejemplo no es claro)
- Puedo, para empezar, trackear un Metheor Method desde el useTracker? Cómo obtengo una respuesta.

Y bueno, cuando decidí echar el cambio anterior para atrás y manejar cursores... resultó que no era tan compatible. Se detectaron dos colecciones de Mongo abiertas a la misma base, y el proyecto crashep

#### Camino que seguí

De forma que el proyecto aún está sin el `remove autopublish`, y aunque aislé bien los métodos y su uso, no encuentro cómo usarlos. Incluso ya construí un test, acoplándome a lo que hice y sus capacidades actuales.

Nota divertida: El ejemplo tampoco es claro de cómo funciona el mocking de datos.

### TDD

Ahora haré un análisis corto de las ventajas y desventajas del TDD

**Desventajas**
- Desarrollo "más lento"
- Tienes que planear el test siempre antes de empezar a codear
- Los tests corren hacia métodos pequeños, pero es difícil testear la funcionalidad a más alto nivel

**Ventajas**
- Descubrimiento casi instantáneo de errores
- Como codeas para que sea fácil de testear, la calidad del código es mejor
- Menos bugs en producción
- Funcionamiento auto-descriptivo, mediante los tests
- Mejora la calidad del software

### Conclusiones

Mi proyecto aún está lejos de concluirse. Cambiaré varias cosas de aquí en cuanto lo haga