package quiz.backend.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.backend.quiz.dto.option.OptionDetails;
import quiz.backend.quiz.dto.option.OptionRegister;
import quiz.backend.quiz.dto.option.OptionList;
import quiz.backend.quiz.service.interfac.OptionService;

@RestController
@RequestMapping("/api/option")
public class OptionController {
    @Autowired
    private OptionService optionService;

    @PostMapping("/admin/add/{questionId}")
    public ResponseEntity<OptionDetails> addOption(@RequestBody OptionRegister optionRegister, @PathVariable Long questionId){
        OptionDetails createdOptionDetails =optionService.addOption(optionRegister,questionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOptionDetails);
    }

    @GetMapping("/user/{questionId}")
    public ResponseEntity<OptionList> getOptions(@PathVariable Long questionId) {
        OptionList optionList = optionService.getAllOptions(questionId);
        return ResponseEntity.ok(optionList);
    }

    @GetMapping("/user/option/{optionId}")
    public ResponseEntity<OptionDetails> getOption(@PathVariable Long optionId) {
        OptionDetails optionDetails = optionService.getOption(optionId);
        return ResponseEntity.ok(optionDetails);
    }

    @PutMapping("/admin/update/{optionId}")
    public ResponseEntity<OptionDetails> updateOption(@RequestBody OptionRegister optionRegister, @PathVariable Long optionId){
        OptionDetails updatedOptionDetails =optionService.updateOption(optionRegister,optionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedOptionDetails);
    }

    @DeleteMapping("/admin/delete/{optionId}")
    public void deleteOption(@PathVariable Long optionId){
        optionService.deleteOption(optionId);
    }
}
