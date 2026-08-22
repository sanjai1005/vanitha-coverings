package com.vanitha.coverings.config;

import com.vanitha.coverings.model.Jewel;
import com.vanitha.coverings.model.User;
import com.vanitha.coverings.repository.JewelRepository;
import com.vanitha.coverings.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JewelRepository jewelRepository;

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        // Auto-drop obsolete security columns if present in MySQL
        try {
            jdbcTemplate.execute("ALTER TABLE users DROP COLUMN security_question");
            System.out.println(">>> SEEDER: Dropped obsolete security_question column from users table.");
        } catch (Exception ignored) {}
        try {
            jdbcTemplate.execute("ALTER TABLE users DROP COLUMN security_answer");
            System.out.println(">>> SEEDER: Dropped obsolete security_answer column from users table.");
        } catch (Exception ignored) {}

        // Seed or update default admin with phone number 8825869139
        userRepository.findByUsername("admin").ifPresentOrElse(admin -> {
            admin.setPhoneNumber("8825869139");
            userRepository.save(admin);
            System.out.println(">>> SEEDER: Admin phone number verified/updated to 8825869139!");
        }, () -> {
            String hashedPassword = BCrypt.hashpw("admin123", BCrypt.gensalt());
            User admin = new User("admin", hashedPassword, "8825869139", "ADMIN");
            userRepository.save(admin);
            System.out.println(">>> SEEDER: Default Admin user seeded successfully! (Username: admin, Phone: 8825869139)");
        });

        // Seed sample jewels if db is empty
        if (jewelRepository.count() == 0) {
            String ringSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111' /><circle cx='50' cy='55' r='22' stroke='gold' stroke-width='6' fill='none'/><circle cx='50' cy='28' r='10' fill='cyan' stroke='gold' stroke-dasharray='1,1' stroke-width='2'/></svg>";
            String attigaiSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111' /><path d='M20,35 Q50,85 80,35' fill='none' stroke='gold' stroke-width='5' stroke-dasharray='2,2'/><path d='M30,35 Q50,70 70,35' fill='none' stroke='gold' stroke-width='3'/><circle cx='50' cy='68' r='8' fill='crimson' stroke='gold' stroke-width='2'/></svg>";
            String babyChainSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111' /><path d='M15,45 Q50,85 85,45' fill='none' stroke='gold' stroke-width='3' stroke-dasharray='4,2'/></svg>";
            String danglingEarSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111' /><circle cx='30' cy='35' r='12' fill='none' stroke='gold' stroke-width='3'/><circle cx='70' cy='35' r='12' fill='none' stroke='gold' stroke-width='3'/><path d='M30,47 L30,70' stroke='gold' stroke-width='4'/><path d='M70,47 L70,70' stroke='gold' stroke-width='4'/><circle cx='30' cy='72' r='7' fill='gold'/><circle cx='70' cy='72' r='7' fill='gold'/></svg>";
            String bridalSetSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23200' /><path d='M25,25 Q50,75 75,25' fill='none' stroke='gold' stroke-width='6'/><circle cx='50' cy='60' r='10' fill='gold'/><circle cx='32' cy='52' r='6' fill='gold'/><circle cx='68' cy='52' r='6' fill='gold'/></svg>";

            jewelRepository.save(new Jewel(
                "Aimpone Designer Attigai", 
                "ஐம்பொன் டிசைனர் அட்டிகை", 
                "Traditional five-metal (Aimpone) attigai with a crimson ruby center drop. Durable and matching natural gold luster.",
                "அழகிய சிவப்பு ரூபி மையப்பகுதியைக் கொண்ட பாரம்பரிய ஐம்பொன் அட்டிகை. நீடித்த உழைப்பு மற்றும் இயற்கை தங்க நிறம் கொண்டது.",
                2450.0, 
                attigaiSvg, 
                "Attigai — Aimpone Attigai"
            ));

            jewelRepository.save(new Jewel(
                "Elegant Diamond Cut Ring", 
                "நேர்த்தியான வைர வடிவ மோதிரம்", 
                "Gold-plated covering ring studded with a sparkling cyan diamond-cut stone. Fully adjustable size.",
                "பிரகாசமான சியான் வைர வடிவ கல் பதித்த தங்க முலாம் பூசப்பட்ட கவரிங் மோதிரம். எளிதில் அளவு மாற்றக்கூடியது.",
                450.0, 
                ringSvg, 
                "Rings"
            ));

            jewelRepository.save(new Jewel(
                "Premium Baby Neck Chain", 
                "பிரீமியம் குழந்தைகளுக்கான செயின்", 
                "Lightweight smooth-finish baby chain. Specially crafted to be safe for child skin with zero sharp edges.",
                "இலகுரக மென்மையான பினிஷ் கொண்ட பேபி செயின். குழந்தைகளுக்கு பாதுகாப்பான முறையில் தயாரிக்கப்பட்டது.",
                750.0, 
                babyChainSvg, 
                "Chains — Baby Chains"
            ));

            jewelRepository.save(new Jewel(
                "Royal Temple Dangling Earrings", 
                "ராயல் கோயில் தொங்கு காதணிகள்", 
                "Dazzling royal design hanging earrings. Heavy gold-plated covering with pearl bead highlights.",
                "பளபளப்பான ராயல் டிசைன் தொங்கு காதணிகள். முத்து மணிகளுடன் கூடிய தடிமனான தங்க முலாம் பூசப்பட்ட கவரிங் காதணிகள்.",
                890.0, 
                danglingEarSvg, 
                "Ear Jewellery — Dangling Earrings"
            ));

            jewelRepository.save(new Jewel(
                "Grand Foam Bridal Jewellery Set", 
                "பிரமாண்ட ஃபோம் திருமண நகை செட்", 
                "Exquisite marriage bridal set with heavy choker, long necklace and matching earrings. Made with lightweight gold-finish foam technology.",
                "கழுத்தணி, நீள ஆரம் மற்றும் காதணிகள் அடங்கிய பிரமாண்ட திருமண நகை செட். இலகுரக தங்க பினிஷ் ஃபோம் தொழில்நுட்பத்தால் செய்யப்பட்டது.",
                6800.0, 
                bridalSetSvg, 
                "Bridal Jewellery Sets"
            ));

            System.out.println(">>> SEEDER: 5 Sample jewels seeded successfully!");
        }
    }
}
