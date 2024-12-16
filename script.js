import com.google.gson.Gson;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class UltimateClickerGame {
    private static final String SUPABASE_URL = "https://mlxuipvhcbmyfrmlsuqd.supabase.co"; // Tu URL de Supabase
    private static final String SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Tu clave pública de Supabase
    private static int clickCount = 0;

    public static void main(String[] args) {
        System.out.println("🔥 Ultimate Clicker Challenge 🔥");
        System.out.println("¡Sé el número uno en el ranking mundial!");
        
        // Interactuar con el botón de clic
        Scanner scanner = new Scanner(System.in);
        System.out.println("¡Presiona enter para hacer clic!");
        
        while (true) {
            String input = scanner.nextLine();
            if (input.equals("")) {
                clickCount++;
                System.out.println("Tus Clicks: " + clickCount);
                
                // Obtener la IP del usuario (usando una API externa)
                String ip = getUserIP();

                // Guardar los clics en la base de datos de Supabase
                saveClickData(ip, clickCount);
                
                // Mostrar el ranking mundial
                getLeaderboard();
            }
        }
    }

    // Función para obtener la IP del usuario (usando ipify)
    private static String getUserIP() {
        try {
            URL url = new URL("https://api.ipify.org?format=json");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Parsear el JSON de la respuesta
            Gson gson = new Gson();
            IpResponse ipResponse = gson.fromJson(response.toString(), IpResponse.class);
            return ipResponse.getIp();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Unknown IP";
    }

    // Función para guardar los clics en la base de datos de Supabase
    private static void saveClickData(String ip, int clicks) {
        try {
            URL url = new URL(SUPABASE_URL + "/rest/v1/clicks");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + SUPABASE_KEY);
            connection.setDoOutput(true);

            String jsonInputString = String.format("{\"ip\": \"%s\", \"click_count\": %d}", ip, clicks);
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            connection.getResponseCode(); // Hacer la solicitud

            System.out.println("Clics guardados correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Función para obtener y mostrar el ranking mundial
    private static void getLeaderboard() {
        try {
            URL url = new URL(SUPABASE_URL + "/rest/v1/clicks?select=ip,click_count&order=click_count.desc&limit=10");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + SUPABASE_KEY);
            
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Parsear el JSON de la respuesta
            Gson gson = new Gson();
            Leaderboard[] leaderboard = gson.fromJson(response.toString(), Leaderboard[].class);

            System.out.println("🏆 Ranking Mundial:");
            for (Leaderboard entry : leaderboard) {
                System.out.println(entry.getIp() + ": " + entry.getClickCount() + " clics");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Clases para parsear las respuestas JSON
    static class IpResponse {
        private String ip;

        public String getIp() {
            return ip;
        }
    }

    static class Leaderboard {
        private String ip;
        private int clickCount;

        public String getIp() {
            return ip;
        }

        public int getClickCount() {
            return clickCount;
        }
    }
}
