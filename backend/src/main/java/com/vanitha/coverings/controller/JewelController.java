package com.vanitha.coverings.controller;

import com.vanitha.coverings.model.Jewel;
import com.vanitha.coverings.service.JewelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jewels")
public class JewelController {

    @Autowired
    private JewelService jewelService;

    // REST API Endpoint: GET /api/jewels
    @GetMapping
    public ResponseEntity<List<Jewel>> getAllJewels() {
        List<Jewel> jewels = jewelService.getAllJewels();
        return ResponseEntity.ok(jewels);
    }

    // REST API Endpoint: GET /api/jewels/category
    @GetMapping("/category")
    public ResponseEntity<List<Jewel>> getJewelsByCategory(
            @RequestParam("category") String category,
            @RequestParam(value = "prefix", defaultValue = "false") boolean prefix) {
        List<Jewel> jewels = jewelService.getJewelsByCategory(category, prefix);
        return ResponseEntity.ok(jewels);
    }

    // REST API Endpoint: GET /api/jewels/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getJewelById(@PathVariable Long id) {
        return jewelService.getJewelById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // REST API Endpoint: POST /api/jewels/add
    @PostMapping("/add")
    public ResponseEntity<?> addJewel(@RequestBody Jewel jewel) {
        try {
            Jewel savedJewel = jewelService.addJewel(jewel);
            return ResponseEntity.ok(Map.of(
                "message", "Jewel added successfully",
                "id", savedJewel.getId()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: PUT /api/jewels/update/{id}
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateJewel(@PathVariable Long id, @RequestBody Jewel jewelDetails) {
        try {
            Jewel updatedJewel = jewelService.updateJewel(id, jewelDetails);
            return ResponseEntity.ok(Map.of(
                "message", "Jewel updated successfully",
                "id", updatedJewel.getId()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: DELETE /api/jewels/delete/{id}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteJewel(@PathVariable Long id) {
        boolean isDeleted = jewelService.deleteJewel(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("message", "Jewel deleted successfully"));
    }
}
