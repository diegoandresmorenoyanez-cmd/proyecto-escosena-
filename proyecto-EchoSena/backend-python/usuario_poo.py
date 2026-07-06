from abc import ABC, abstractmethod

# ==========================================
# 1. ABSTRACCIÓN (Clase en CamelCase)
# ==========================================
class PersonaSistema(ABC):
    def __init__(self, nombreUsuario, correoUsuario):
        # Variables en lowerCamelCase
        self.nombreUsuario = nombreUsuario
        self.correoUsuario = correoUsuario

    @abstractmethod
    def mostrarRol(self):  # Método en lowerCamelCase
        pass


# ==========================================
# 2. HERENCIA Y ENCAPSULACIÓN
# ==========================================
class UsuarioSena(PersonaSistema):

    def __init__(self, nombreUsuario, correoUsuario, passwordAcceso):
        super().__init__(nombreUsuario, correoUsuario)
        self.__passwordAcceso = passwordAcceso  # Atributo privado

    
    #Métodos en lowerCamelCase como exige la lista de chequeo
    def getPasswordAcceso(self):
        return self.__passwordAcceso

    def setPasswordAcceso(self, nuevoPassword):
        if len(nuevoPassword) >= 6:
            self.__passwordAcceso = nuevoPassword
            print("Contraseña actualizada con éxito.")
        else:
            print("Error: La contraseña debe tener al menos 6 caracteres.")

    def mostrarRol(self):
        return "Usuario General"


# ==========================================
# 3. POLIMORFISMO





# ==========================================
class AdministradorCgmti(UsuarioSena):
    def __init__(self, nombreUsuario, correoUsuario, passwordAcceso, areaDependencia):
        super().__init__(nombreUsuario, correoUsuario, passwordAcceso)
        self.areaDependencia = areaDependencia

    # Sobrescritura de método aplicando Polimorfismo
    def mostrarRol(self):
        return f"Administrador del CGMTI - Área: {self.areaDependencia}"


# ==========================================
# 4. MANEJO DE EXCEPCIONES



# ==========================================
def iniciarSesionSistema(usuarioObjeto, passwordIngresado):
    print("\n--- Intentando iniciar sesión en el sistema CGMTI ---")
    try:
        if usuarioObjeto.getPasswordAcceso() != passwordIngresado:
            raise ValueError("La contraseña ingresada no coincide con nuestro sistema.")
        
        print(f"¡Ingreso exitoso! Bienvenido, {usuarioObjeto.nombreUsuario}.")
        print(f"Permisos asignados: {usuarioObjeto.mostrarRol()}")

    except ValueError as errorValidacion:
        print(f"❌ Error de Autenticación: {errorValidacion}")
    except Exception as errorGeneral:
        print(f"❌ Ocurrió un error inesperado: {errorGeneral}")
    finally:
        print("Proceso de autenticación finalizado.")


# Ejecución de la simulación organizada
if __name__ == "__main__":
    adminSena = AdministradorCgmti("Diego Moreno", "diego@sena.edu.co", "sena123", "Teleinformática")
    
    # 1. Prueba Fallida (Excepción)
    iniciarSesionSistema(adminSena, "clave_incorrecta")
    
    print("-" * 40)
    
    # 2. Prueba Exitosa (Polimorfismo)
    iniciarSesionSistema(adminSena, "sena123")