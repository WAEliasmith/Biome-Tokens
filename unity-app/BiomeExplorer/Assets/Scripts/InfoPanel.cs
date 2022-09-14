using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class InfoPanel : MonoBehaviour
{
  public float pollution = 3f;
  public string name = "1";
  public string oracle = "2";
  public string id = "1";


  public Text NameText = null;
  public Text PollutionText = null;
  public Text OracleText = null;
  public CanvasGroup trans;


  public float fade = 0f;
  public string oldurl = "";
  public void Download(string url)
  {
    if(url != oldurl){
      oldurl = url;
      image.texture = null;
      Debug.Log("url: " + url);
      StartCoroutine(DownloadImage(url));
    }
  }

  public RawImage image = null;

IEnumerator DownloadImage(string MediaUrl)
{   
  UnityWebRequest request = UnityWebRequestTexture.GetTexture(MediaUrl);
  yield return request.SendWebRequest();
  if(request.isNetworkError || request.isHttpError) 
    Debug.Log(request.error);
  else
    image.texture = ((DownloadHandlerTexture) request.downloadHandler).texture;
} 
  // Update is called once per frame
  void Update()
  {
    NameText.text = "Name: " + name;
    PollutionText.text = "Pollution: " + pollution.ToString();
    OracleText.text = "Oracle: " + oracle;
    trans.alpha = fade;
    fade-=0.01f;
    if(fade <= 0){
      fade = 0;
    }
    if(fade >= 1){
      fade = 1;
    }
    
    if (Input.GetKeyDown(KeyCode.Return) && fade > 0.6f)
    {
      Application.OpenURL("http://localhost:3000/token/" + id);
    }
  }
}
