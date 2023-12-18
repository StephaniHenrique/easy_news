package com.easynews.easynewsserver.controllers;

import com.easynews.easynewsserver.model.TextRequest;
import com.easynews.easynewsserver.model.TextResponse;
import com.easynews.easynewsserver.service.TextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/text")
public class TextController {

    @Autowired
    private TextService textService;

    @PostMapping("/save")
    public TextResponse saveText(@RequestBody TextRequest textRequest) {
        return textService.saveText(textRequest);
    }

    @PostMapping("/user")
    public List<TextResponse> getAllUsersText(@RequestBody String userEmail) {
        return textService.getAllUsersText(userEmail);
    }

}
