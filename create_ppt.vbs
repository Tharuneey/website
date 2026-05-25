Set objPPT = CreateObject("PowerPoint.Application")
objPPT.Visible = True
Set objPres = objPPT.Presentations.Add()

objPres.PageSetup.SlideSize = 1 ' ppSlideSizeOnScreen16x9 if supported, else default

' Slide 1
Set objSlide1 = objPres.Slides.Add(1, 12) ' 12 = ppLayoutBlank
objSlide1.FollowMasterBackground = False
objSlide1.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_1_1778911282917.png"

' Slide 2
Set objSlide2 = objPres.Slides.Add(2, 12)
objSlide2.FollowMasterBackground = False
objSlide2.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_2_1778911303008.png"

' Slide 3
Set objSlide3 = objPres.Slides.Add(3, 12)
objSlide3.FollowMasterBackground = False
objSlide3.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_3_1778911427856.png"

' Slide 4
Set objSlide4 = objPres.Slides.Add(4, 12)
objSlide4.FollowMasterBackground = False
objSlide4.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_4_1778911440583.png"

' Slide 5
Set objSlide5 = objPres.Slides.Add(5, 12)
objSlide5.FollowMasterBackground = False
objSlide5.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_5_1778911572419.png"

' Slide 6
Set objSlide6 = objPres.Slides.Add(6, 12)
objSlide6.FollowMasterBackground = False
objSlide6.Background.Fill.UserPicture "C:\Users\varun\.gemini\antigravity\brain\707e61b2-d308-4867-96ab-48e173d7b525\slide_6_1778911649650.png"

' Slide 7
Set objSlide7 = objPres.Slides.Add(7, 12)
objSlide7.FollowMasterBackground = False
objSlide7.Background.Fill.ForeColor.RGB = RGB(9, 9, 11)
Set shp = objSlide7.Shapes.AddTextbox(1, 100, 200, 700, 100)
shp.TextFrame.TextRange.Text = "START BUILDING TODAY"
shp.TextFrame.TextRange.Font.Size = 48
shp.TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)

For Each sld In objPres.Slides
    sld.SlideShowTransition.EntryEffect = 513 ' ppEffectFade
Next

objPres.SaveAs "C:\Users\varun\OneDrive\Desktop\PPT\Figma_to_Bolt_AntiGravity.pptx"
' We leave it open so the user can see it!
