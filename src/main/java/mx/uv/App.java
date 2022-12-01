package mx.uv;

import static spark.Spark.*;
import com.google.gson.Gson;

import javafx.event.Event;
/**
 * Hello world!
 *
 */
public class App {
    public static Gson gson= new Gson();
    public static void main( String[] args ){
        Usuario uAux = new Usuario();

        port(80);

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });
        before((req, res) -> res.header("Access-Control-Allow-Origin", "*"));


        

        post("/login", (req, res) -> {
            String datosFormulario = req.body();
            Usuario u=gson.fromJson(datosFormulario, Usuario.class);
            if (DAO.compruebaUsuario(u)==true ){
                uAux.setNombre(u.getNombre());
                uAux.setPassword(u.getPassword());
                return true;
            }else{
                return false;
            }
        });

        post("/register" ,(req,res)-> {
            String datosFormulario = req.body();
            Usuario u = gson.fromJson(datosFormulario, Usuario.class);
            String x= DAO.crearUsuario(u);
            uAux.setNombre(u.getNombre());
            uAux.setPassword(u.getPassword());
            return x;
        });

        get("/main",(req,res)-> {
            return uAux.getNombre();
        });

        post("/main" ,(req,res)-> {
            String datosEvento = req.body();
            Evento ev = gson.fromJson(datosEvento, Evento.class);
            String x= DAOEvento.crearEvento(ev);
            return x;
        });
        
    }
}
