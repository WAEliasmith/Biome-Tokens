using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Runtime.InteropServices;

public class WebsiteReader : MonoBehaviour {

  void Start()
  {
      gameObject.SendMessage("SendToController", "start");
  }

  public void SendToController(string message)
  {
      Debug.Log(message);
  }

    // [DllImport("__Internal")]
    // private static extern string GetURLFromPage();

    // // Use this for initialization
    // void Start()
    // {
    //     Debug.Log(GetURLFromPage());
    //     //StartCoroutine(GetText());

    // }

    // IEnumerator GetText() {
    //     UnityWebRequest www = new UnityWebRequest("https://ahfarmer.github.io/calculator/");
    //     www.downloadHandler = new DownloadHandlerBuffer();
    //     yield return www.SendWebRequest();

    //     if (www.result != UnityWebRequest.Result.Success) {
    //         Debug.Log(www.error);
    //     }
    //     else {
    //         // Show results as text
    //         Debug.Log(www.downloadHandler.text);

    //         // Or retrieve results as binary data
    //         byte[] results = www.downloadHandler.data;
    //     }
    // }
}